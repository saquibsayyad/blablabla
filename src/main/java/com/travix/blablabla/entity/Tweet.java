package com.travix.blablabla.entity;


import org.apache.commons.lang3.builder.ReflectionToStringBuilder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name = "tweets")
public class Tweet {

    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "tweet")
    private String tweet;

    @Column(name = "affiliate")
    private String affiliate;

    @Column(name = "tweet_time")
    private Date tweetTime;

    @Column(name = "score")
    private BigDecimal score;

    @Column(name = "magnitude")
    private BigDecimal magnitude;

    @Column(name = "language")
    private String language;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTweet() {
        return tweet;
    }

    public void setTweet(String tweet) {
        this.tweet = tweet;
    }

    public String getAffiliate() {
        return affiliate;
    }

    public void setAffiliate(String affiliate) {
        this.affiliate = affiliate;
    }

    public Date getTweetTime() {
        return tweetTime;
    }

    public void setTweetTime(Date tweetTime) {
        this.tweetTime = tweetTime;
    }

    public BigDecimal getScore() {
        return score;
    }

    public void setScore(BigDecimal score) {
        this.score = score;
    }

    public BigDecimal getMagnitude() {
        return magnitude;
    }

    public void setMagnitude(BigDecimal magnitude) {
        this.magnitude = magnitude;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    @Override
    public String toString() {
        return ReflectionToStringBuilder.toString(this);
    }
}
