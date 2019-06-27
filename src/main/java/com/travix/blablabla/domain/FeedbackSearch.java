package com.travix.blablabla.domain;

import com.travix.blablabla.types.FeedbackSource;

import java.time.LocalDate;

public class FeedbackSearch {
    private LocalDate startDate;
    private LocalDate endDate;
    private String affiliate;
    private FeedbackSource feedbackSource;

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getAffiliate() {
        return affiliate;
    }

    public void setAffiliate(String affiliate) {
        this.affiliate = affiliate;
    }

    public FeedbackSource getFeedbackSource() {
        return feedbackSource;
    }

    public void setFeedbackSource(FeedbackSource feedbackSource) {
        this.feedbackSource = feedbackSource;
    }
}
