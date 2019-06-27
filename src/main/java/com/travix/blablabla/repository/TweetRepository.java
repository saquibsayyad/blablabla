package com.travix.blablabla.repository;

import com.travix.blablabla.entity.Tweet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.math.BigDecimal;
import java.util.List;

public interface TweetRepository extends JpaRepository<Tweet, Long> {
    List<Tweet> findByScore(BigDecimal score);
    List<Tweet> findByAffiliate(String affiliate);

    @Query("from Tweet ORDER BY tweet_time ASC")
    List<Tweet> findAllOrOrderByTweetTime();

    @Query("from Tweet WHERE affiliate=:affiliate ORDER BY tweet_time ASC")
    List<Tweet> findAllOrOrderByTweetTime(String affiliate);
}
