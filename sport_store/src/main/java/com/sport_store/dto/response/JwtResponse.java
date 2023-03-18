
package com.sport_store.dto.response;

import java.util.List;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String name;
    private Long id;
    private String username;
    private String email;
    private String avatar;
    private String phoneNumber;
    private String address;
    private List<String> roles;

    public JwtResponse() {
    }

    public JwtResponse(String token, String name, Long id, String username, String email, String avatar, List<String> roles) {
        this.token = token;
        this.name = name;
        this.id = id;
        this.username = username;
        this.email = email;
        this.roles = roles;
        this.avatar = avatar;
    }

    public JwtResponse(String token, String name, Long id, String username, String email, String avatar, String phoneNumber, String address, List<String> roles) {
        this.token = token;
        this.name = name;
        this.id = id;
        this.username = username;
        this.email = email;
        this.avatar = avatar;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.roles = roles;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}