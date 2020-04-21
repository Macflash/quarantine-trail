import * as React from "react";
import TweetImg from '../images/shitnews.png';
import { tweets } from "./tweets";
import { PickRandom } from "../utils";

export const TweetBox: React.FC<{date: Date}> = props => {
    const dateToUse = new Date(props.date);
    dateToUse.setHours(dateToUse.getHours() + 16 * Math.random());
    dateToUse.setMinutes(dateToUse.getMinutes() + 60 * Math.random());
    dateToUse.setSeconds(dateToUse.getSeconds() + 60 * Math.random());
    return <div style={{ textAlign: 'left', position: "relative",
    fontFamily: "Helvetica, Arial",  }}>
        <div style={{ 
             backgroundColor: "white",
             position: "absolute", top: 36, right: 0, left: 0, fontSize: 9, 
              height: 40, 
              padding: "4px 12px" }}>{writeTweet(probs)}</div>
        <div style={{ position: "absolute",
         top: 83, right: 0, left: 0,
          fontSize: 8, color: "grey", padding: "1px 12px",
          backgroundColor: "white"//, opacity: .5
           }}>{dateToUse.toLocaleString()}</div>
        <div style={{ position: "absolute", top: 98, right: 208, left: 47, fontSize: 9, backgroundColor: "white", color: "grey" }}>{PickRandom(retweetCount)}</div>
        <div style={{ position: "absolute", top: 98, right: 0, left: 87, fontSize: 9, backgroundColor: "white", color: "grey"}}>{PickRandom(favoriteCount)}</div>
        <img width="100%" src={TweetImg} />
    </div>;
}

export const NewsFeed: React.FC<{date: Date}> = props => {
    return <div style={{ backgroundColor: "white" }}>
        <TweetBox {...props} />
        <TweetBox {...props} />
    </div>
}


// create the probabilties!
var retweetCount: number[] = [];
var favoriteCount: number[] = [];
var frequency: { [word: string]: number } = {};
var probs: { [word: string]: { [nextWord: string]: number } } = {};
var lastWord: string | null = null;

tweets.forEach(tweet => {
    retweetCount.push(tweet.retweet_count);
    favoriteCount.push(tweet.favorite_count);
    lastWord = null;
    const words = tweet.text.split(" ");
    words.map(word => word.trim()).forEach(word => {
        // skip these words
        if(word.endsWith("…") || word.endsWith("...")){return;}
        if (lastWord) {
            probs[lastWord] = probs[lastWord] || {};
            probs[lastWord][word] = probs[lastWord][word] || 0;
            probs[lastWord][word]++;
        }

        frequency[word] = frequency[word] || 0;
        frequency[word]++;
        lastWord = word;
    });
});

// normalize
Object.keys(probs).forEach(word => {
    var freq = probs[word];
    var sum = 0;
    Object.keys(freq).forEach(f => {
        sum += freq[f];
    });

    Object.keys(freq).forEach(f => {
        freq[f] /= sum;
    });
});


// pick random word!
function pickRandom(something: any) {
    var keys = Object.keys(something);
    var r = Math.random();
    r *= keys.length;
    r = Math.floor(r);
    return something[keys[r]];
}

function pickNextWork(word: any) {
    var r = Math.random();
    var nextWords = Object.keys(word);
    for (var i = 0; i < nextWords.length; i++) {
        if (r < word[nextWords[i]]) {
            return nextWords[i];
        }

        r -= word[nextWords[i]];
    }
    return nextWords[0];
}

const endsWithPunctuation = (x: string): boolean => {
    var z = x.trim();
    var y = z[z.length-1];
    switch (y) {
        case "…":
        case ".":
        case ",":
        case "!":
        case "?":
        case "\"":
        case ",":
        case ";":
        case ":":
        case "'":
            return true;
    }

    return false;
}

const replacePunctuation = (x: string): string => {
    var z = x.trim();
    var y = z[z.length-1];
    console.log(x, y);
    var newEnd = y;
    switch (y) {
        case ",":
        case ";":
        case ":":
            newEnd = "!";
            break;
        case "…":
        case ".":
        case "!":
        case "?":
        case "\"":
        case "'":
    }

    return z.substr(0, z.length -1) + newEnd;
}

export function writeTweet(t: any) {
    var s = "";
    var start = pickRandom(t);
    var current = start;
    while (s.length < 140) {
        var next = pickNextWork(current);
        s += next + " ";
        current = t[next];
        if (current == undefined) { current = pickRandom(t); }
        if(s.length > 100 && endsWithPunctuation(s)){ break; }
    }

    s = s[0].toUpperCase() + s.substr(1);

    if(endsWithPunctuation(s)){ return replacePunctuation(s.trim()); }
    
    return replacePunctuation(s.trim()) + "…";
}