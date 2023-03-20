
interface signUp {
  username: string;
  email: string;
  password: string;
}

interface login {
  email: string,
  password: string,
}

interface iProduct{
  product_name:string;
  product_price:number;
  product_color:string;
  product_category:string;
  product_discription:string;
  product_img_url:string;
}

export { signUp, login, iProduct}
