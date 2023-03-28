import { Injectable } from '@angular/core';
import {Cart} from '../../entity/order/cart';

const TOKEN_KEY = 'Token_key';
const NAME_KEY = 'Name_key';
const ROLE_KEY = 'Role_key';
const USERNAME_KEY = 'Username_account_key';
const ID_ACCOUNT_KEY = 'Id_Account_key';
const EMAIL_KEY = 'Email_key';
const AVATAR_KEY = 'Avatar_key';
const USER_KEY = 'auth-user';
const CART = 'cart';
const DETAIL_ID = 'detail_id';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion: logout
   *
   */
  logout() {
    window.localStorage.clear();
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.removeItem(ID_ACCOUNT_KEY);
    window.sessionStorage.removeItem(AVATAR_KEY);
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.removeItem(DETAIL_ID);
  }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion: savetokenlocal
   *
   */
  public saveTokenLocal(token: string) {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion: savetokensession
   *
   */
  public saveTokenSession(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion: get token
   *
   */
  public getToken(): string {
    if (localStorage.getItem(TOKEN_KEY) !== null) {
      return localStorage.getItem(TOKEN_KEY) as string;
    } else {
      return sessionStorage.getItem(TOKEN_KEY) as string;
    }
  }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion: saveUserLocal
   *
   */
  public saveUserLocal(user: any,email: string, idAccount: string, username: string, name: string, roles: string[], avatar: string) {
    window.localStorage.removeItem(EMAIL_KEY);
    window.localStorage.removeItem(NAME_KEY);
    window.localStorage.removeItem(ROLE_KEY);
    window.localStorage.removeItem(USERNAME_KEY);
    window.localStorage.removeItem(ID_ACCOUNT_KEY);
    window.localStorage.removeItem(AVATAR_KEY);
    window.localStorage.setItem(EMAIL_KEY, JSON.stringify(email));
    window.localStorage.setItem(ID_ACCOUNT_KEY, JSON.stringify(idAccount));
    window.localStorage.setItem(USERNAME_KEY, JSON.stringify(username));
    window.localStorage.setItem(NAME_KEY, JSON.stringify(name));
    window.localStorage.setItem(ROLE_KEY, JSON.stringify(roles));
    window.localStorage.setItem(AVATAR_KEY, JSON.stringify(avatar));
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion: saveUserSession
   *
   */
  public saveUserSession(user: any, email: string, idAccount: string, username: string, name: string, roles: string[], avatar: string) {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.removeItem(ID_ACCOUNT_KEY);
    window.sessionStorage.removeItem(AVATAR_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, JSON.stringify(email));
    window.sessionStorage.setItem(ID_ACCOUNT_KEY, JSON.stringify(idAccount));
    window.sessionStorage.setItem(USERNAME_KEY, JSON.stringify(username));
    window.sessionStorage.setItem(NAME_KEY, JSON.stringify(name));
    window.sessionStorage.setItem(ROLE_KEY, JSON.stringify(roles));
    window.sessionStorage.setItem(AVATAR_KEY, JSON.stringify(avatar));
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion:
   *
   */
  public getName(): string {
    if(localStorage.getItem(NAME_KEY) != null){
      return <string> localStorage.getItem(NAME_KEY);
    }
    return <string> sessionStorage.getItem(NAME_KEY);
  }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion:
   *
   */
  public getEmail(): string{
    if(localStorage.getItem(EMAIL_KEY) != null){
      return <string> localStorage.getItem(EMAIL_KEY);
    }
    return <string> sessionStorage.getItem(EMAIL_KEY);
  }

  public getIdAccount(): string {
    if(localStorage.getItem(ID_ACCOUNT_KEY) != null){
      return <string> localStorage.getItem(ID_ACCOUNT_KEY);
    }
    return <string> sessionStorage.getItem(ID_ACCOUNT_KEY);
  }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion:
   *
   */
  public getUsername(): string {
    if(localStorage.getItem(USERNAME_KEY) != null){
      return <string> localStorage.getItem(USERNAME_KEY);
    }
    return <string> sessionStorage.getItem(USERNAME_KEY);
  }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion: getUser
   *
   */
  public getUser() {
    let itemString;
    if(localStorage.getItem(USER_KEY) != null) {
      itemString = localStorage.getItem(USER_KEY);
    } else {
      itemString = sessionStorage.getItem(USER_KEY);
    }
    return itemString ? JSON.parse(itemString) : null;
  }
  /**
   * Create by: SyTV
   * Date create: 02/03/2023
   * funtion: getRoles
   *
   */
  public getRole(): string[] {
    if (localStorage.getItem(ROLE_KEY) != null){
      return JSON.parse(<string> localStorage.getItem(ROLE_KEY))
    }
    return JSON.parse(<string> sessionStorage.getItem(ROLE_KEY));
  }

  // public setDetailId(id: number) {
  //   sessionStorage.removeItem(DETAIL_ID);
  //   sessionStorage.setItem(DETAIL_ID,JSON.stringify(id));
  // }
  //
  // getDetailId() {
  //   return JSON.parse(<string> sessionStorage.getItem(DETAIL_ID));
  // }

  //lưu trên local

  public setCart(cart: Cart[]) {
    sessionStorage.removeItem(CART);
    sessionStorage.setItem(CART,JSON.stringify(cart));
  }

  getCart() {
    return JSON.parse(<string> sessionStorage.getItem(CART));
  }

  checkExistName(productName: string) {
    for (let i = 0; i < this.getCart().length; i++) {
      if (this.getCart()[i].name == productName) {
        return true;
      }
    }
    return false;
  }

  upQuantityProduct(productId: number, cartList: Cart[]) {
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].productId == productId) {
        cartList[i].quantity += 1;
        break;
      }
    }
  }

  upQuantityProductPro(productId: number, cartList: Cart[], quantity1: number) {
    for (let i = 0; i < cartList.length; i++) {
      if (cartList[i].productId == productId) {
        cartList[i].quantity += quantity1;
        break;
      }
    }
  }
}
