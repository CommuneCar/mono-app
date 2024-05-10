import {
  Dispatch,
  useState,
  useContext,
  createContext,
  SetStateAction,
  PropsWithChildren,
} from 'react';

type Role = 'driver' | 'rider';

interface RoleContextType {
  role: Role;
  setRole: Dispatch<SetStateAction<Role>>;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const useRole = (): RoleContextType => {
  const role = useContext(RoleContext);
  if (!role) {
    throw new Error('useRole must be used whithin a RoleProvider');
  }

  return role;
};

const RoleProvider: React.FC<PropsWithChildren> = (props) => {
  const [role, setRole] = useState<Role>('rider');

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {props.children}
    </RoleContext.Provider>
  );
};

export type { Role };
export { RoleProvider, useRole };
