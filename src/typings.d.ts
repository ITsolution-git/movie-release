/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}

interface IFbItem {
  '$key': string;
  val?: () => any;
}

interface IUsers extends IFbItem  {
  about: string;
  address: string;
  age: number;
  email: string;
  gender: string;
  isActive: boolean;
  name: string;
  phone: string;
  photoURL: string;
  regDate: Date;
  role: string;
  uid: string;
  username: string;
}