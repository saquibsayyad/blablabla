package com.travix.blablabla.service;

import com.google.cloud.translate.Translate;
import com.google.cloud.translate.Translation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TranslatorService {

    @Autowired
    Translate translate;

    public String translate(String text, String sourceLanguage, String targetLanguage) {

        Translation translation = this.translate.translate(text, Translate.TranslateOption.sourceLanguage(sourceLanguage), Translate.TranslateOption.targetLanguage(targetLanguage));
        return translation.getTranslatedText();
    }
}
