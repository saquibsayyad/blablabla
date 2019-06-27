package com.travix.blablabla.types;

public enum FeedbackSource {
    TWITTER("TWITTER"),
    CALL_CENTER("CALL_CENTER");

    private String value;

    FeedbackSource(String value){
        this.value = value;
    }

    public String getValue(){
        return value;
    }
}
