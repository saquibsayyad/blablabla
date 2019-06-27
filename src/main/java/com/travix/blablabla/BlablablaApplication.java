package com.travix.blablabla;

import com.google.cloud.translate.Translate;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.translate.TranslateOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;
import twitter4j.Twitter;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

import java.io.IOException;

@SpringBootApplication
@Configuration
@EnableScheduling
@EnableJpaRepositories
public class BlablablaApplication {

	public static void main(String[] args) {
		SpringApplication.run(BlablablaApplication.class, args);
	}


	@Bean
	public Twitter twitter(){

		ConfigurationBuilder cb = new ConfigurationBuilder();
		cb.setTweetModeExtended(true);
		cb.setAsyncNumThreads(7);
		cb.setIncludeEntitiesEnabled(false);

		TwitterFactory tf = new TwitterFactory(cb.build());
		return tf.getInstance();

	}

	@Bean
	LanguageServiceClient languageServiceClient() throws IOException {
		return LanguageServiceClient.create();
	}

	@Bean
	Translate translate(){
		return TranslateOptions.getDefaultInstance().getService();
	}

}
