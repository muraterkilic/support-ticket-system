package com.mckbilisim.supportapp.controller.auth;

import com.fasterxml.jackson.annotation.JsonProperty;

public class JWTToken {

    private String idToken;

    private String userName;

    public JWTToken(String idToken, String username) {
        this.idToken = idToken;
        this.userName = username;
    }

    public JWTToken() {
    }

    @JsonProperty("id_token")
    public String getIdToken() {
        return idToken;
    }

    public JWTToken(String idToken) {
        this.idToken = idToken;
    }

    public void setIdToken(String idToken, String username) {
        this.idToken = idToken;
        this.userName = username;
    }
}