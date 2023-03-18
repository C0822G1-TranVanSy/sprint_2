package com.sport_store.dto.request;

import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class SignInForm {
    @Size(min = 3,max = 20, message = "Tài khoản phải lớn hơn 3 ký tự và nhỏ hơn 20 ký tự.")
    @Pattern(regexp = "[\\w]+", message = "Chưa đúng định dạng. Chỉ được nhập chữ hoặc số.")
    private String username;
    @Size(min = 3,max = 20, message = "Mật khẩu phải lớn hơn 3 ký tự và nhỏ hơn 20 ký tự.")
    @Pattern(regexp = "[\\w]+", message = "Chưa đúng định dạng. Chỉ được nhập chữ hoặc số.")
    private String password;

    public SignInForm() {
    }

    public SignInForm(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
