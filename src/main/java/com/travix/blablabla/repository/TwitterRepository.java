package com.travix.blablabla.repository;

import com.travix.blablabla.entity.SocialAccount;
import com.travix.blablabla.entity.Tweet;
import com.travix.blablabla.service.TweetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import twitter4j.Query;
import twitter4j.QueryResult;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;

import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Repository
public class TwitterRepository {

    private static final Logger logger = Logger.getLogger(TweetService.class.getName());

    @Autowired
    Twitter twitter;

    public List<Tweet> findAllTweets(SocialAccount account) throws TwitterException {

        Query query = new Query(String.format("@%s", account.getAccountKey()));
        query.setCount(100);
        query.setResultType(Query.ResultType.recent);
        QueryResult result = twitter.search(query);
        account.setLastRecordId(result.getMaxId());
        return process(result.getTweets(), account);

    }

    private List<Tweet> process(List<Status> statuses, SocialAccount account){
        return statuses.stream()
                .map(status -> toTweet(status))
                .peek(tw -> tw.setAffiliate(account.getAffiliate()))
                .collect(Collectors.toList());
    }

    private Tweet toTweet(Status status){

        Tweet tweet = new Tweet();
        tweet.setId(status.getId());
        tweet.setTweet(status.getText());
        tweet.setLanguage(status.getLang());
        tweet.setTweetTime(status.getCreatedAt());

        return tweet;
    }

    public List<Tweet> find(SocialAccount account) {
        Query query = new Query(String.format("@%s", account.getAccountKey()));
        query.setCount(100);
        query.setResultType(Query.ResultType.recent);
        if(account.getLastRecordId()!=null){
            query.setSinceId(account.getLastRecordId());
        }
        QueryResult result = null;
        try {
            result = twitter.search(query);
            account.setLastRecordId(result.getMaxId());
            return process(result.getTweets(), account);
        } catch (TwitterException e) {
            logger.log(Level.SEVERE, e.getErrorMessage(), e);
        }
        return Collections.emptyList();
    }
}