package com.travix.blablabla.service;

import com.google.cloud.language.v1.AnalyzeSentimentResponse;
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import com.travix.blablabla.entity.Tweet;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

@Service
public class SentimentalAnalyzerService {

    private Document.Type PLAIN_TEXT = Document.Type.PLAIN_TEXT;
    private List<String> SUPPORTED_LANGUAGES = Arrays.asList("en", "fr", "de", "it", "es", "pt");
    private String TRANSLATE_TO = "en";


    @Autowired
    LanguageServiceClient languageClient;

    @Autowired
    TranslatorService translatorService;

    public Tweet calculateScore(Tweet tweet){

        if(!isValidLanguage(tweet)){
            String translated = translatorService.translate(tweet.getTweet(), tweet.getLanguage(), TRANSLATE_TO);
            tweet.setTweet(translated);
            tweet.setLanguage(TRANSLATE_TO);
        }

        AnalyzeSentimentResponse result = this.analyzeDocument(this.prepareDocumentFromTweet(tweet));

        Sentiment sentiment = result.getDocumentSentiment();

        tweet.setScore(BigDecimal.valueOf(sentiment.getScore()));
        tweet.setMagnitude(BigDecimal.valueOf(sentiment.getMagnitude()));


        return tweet;
    }

    public boolean isValidLanguage(Tweet tweet) {
        if(SUPPORTED_LANGUAGES.contains(StringUtils.lowerCase(tweet.getLanguage()))){
            return true;
        }
        return false;
    }

    private Document prepareDocumentFromTweet(Tweet tweet){
        return Document.newBuilder()
                .setContent(tweet.getTweet())
                .setLanguage(tweet.getLanguage())
                .setType(PLAIN_TEXT)
                .build();
    }

    private AnalyzeSentimentResponse analyzeDocument(Document document){
        return languageClient.analyzeSentiment(document);
    }
}
