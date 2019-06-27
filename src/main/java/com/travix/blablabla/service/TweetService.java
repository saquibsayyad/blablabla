package com.travix.blablabla.service;

import com.travix.blablabla.domain.FeedbackSearch;
import com.travix.blablabla.entity.SocialAccount;
import com.travix.blablabla.entity.Tweet;
import com.travix.blablabla.repository.TweetRepository;
import com.travix.blablabla.repository.TwitterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import twitter4j.TwitterException;

import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class TweetService {

    private static final Logger logger = Logger.getLogger(TweetService.class.getName());

    @Autowired
    TweetRepository tweetRepository;

    @Autowired
    TwitterRepository twitterRepository;

    @Autowired
    SentimentalAnalyzerService sentimentalAnalyzerService;

    public void searchAndOperateTweetsForAffiliate(String affiliateCode) throws TwitterException {

        SocialAccount socialAccount = new SocialAccount();
        socialAccount.setAffiliate(affiliateCode);

        twitterRepository.findAllTweets(socialAccount)
                .stream()
                .map(tweet -> sentimentalAnalyzerService.calculateScore(tweet))
                .peek(tweet -> logTweet(tweet))
                .forEach(tweet -> tweetRepository.save(tweet));
    }

    public List<Tweet> tweetsByAffiliate(String affiliateCode){
        return tweetRepository.findByAffiliate(affiliateCode);

    }

    private void logTweet(Tweet tweet){
        logger.log(Level.INFO, "Processing Tweet: {} {}", new Object[] {tweet.getId(), tweet.getTweet()});
    }
}
