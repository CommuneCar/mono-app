import cors from 'cors';
import express from 'express';
import { decode } from 'base64-arraybuffer';
require('dotenv').config(); // Load environment variables
import { postgraphileMiddleware } from './middleware/postgraphile.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.config';
import router from './routes';
import multer from 'multer';
import { supabase } from './supabase';
import { v4 as uuid4 } from 'uuid';

const storage = multer.memoryStorage();

const upload = multer({ storage });

const app = express();
const whitelistedDomains = process.env.WHITELISTED_DOMAINS?.split(';');

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whitelistedDomains?.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200,
  }),
);

// Middleware
app.use(postgraphileMiddleware);

// Routes
app.use('/api/v1', router);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.post('/images', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      res.status(400).json({ message: 'please upload a file' });
      return;
    }

    const fileBase64 = decode(file.buffer.toString('base64'));
    const newFileName = `${uuid4()}.png`;

    const { data, error } = await supabase.storage
      .from('profile-images')
      .upload(newFileName, fileBase64, { contentType: 'image/png' });

    if (error) throw error;

    const { data: image } = supabase.storage
      .from('profile-images')
      .getPublicUrl(data.path);

    res.status(200).json({ image: image.publicUrl });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
