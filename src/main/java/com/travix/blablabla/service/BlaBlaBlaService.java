package com.travix.blablabla.service;

import com.travix.blablabla.entity.SocialAccount;
import com.travix.blablabla.entity.Tweet;
import com.travix.blablabla.repository.SocialAccountRepository;
import com.travix.blablabla.repository.TweetRepository;
import com.travix.blablabla.repository.TwitterRepository;
import com.travix.blablabla.types.FeedbackSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@Service
public class BlaBlaBlaService {

    private static final Logger logger = Logger.getLogger(BlaBlaBlaService.class.getName());

    @Autowired
    SocialAccountRepository socialAccountRepository;

    @Autowired
    TweetRepository tweetRepository;

    @Autowired
    TwitterRepository twitterRepository;

    @Autowired
    SentimentalAnalyzerService sentimentalAnalyzerService;


    @Scheduled(fixedDelay = 60000)
    public void processLatestTweets(){
        List<SocialAccount> accounts = socialAccountRepository.findAllByType(FeedbackSource.TWITTER.getValue());

        List<Tweet> tweets = accounts.stream()
                                .peek(account -> logger.log(Level.INFO, "Processing latest tweets for affiliate: " + account.getAffiliate() +", affiliatekey: " + account.getAccountKey()))
                                .map(account -> CompletableFuture.supplyAsync(() -> twitterRepository.find(account)))
                                .map(cf -> cf.join())
                                .peek(list -> logger.log(Level.INFO, "Loaded tweets " + list.size()))
                                .flatMap(tw -> tw.stream())
                                .map(tweet -> sentimentalAnalyzerService.calculateScore(tweet))
                                .collect(Collectors.toList());

        // Save All Tweets
        tweetRepository.saveAll(tweets);
        logger.log(Level.INFO, "Total number of new tweets: " + tweets.size());

       // Save updated account including last Max id
        socialAccountRepository.saveAll(accounts);

        logger.log(Level.INFO, "Processing Completed.");
    }

}
