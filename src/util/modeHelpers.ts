import { Mode2 } from "../typings";
import english from "../languages/english.json";

export function getWords(
  punctuation: boolean,
  numbers: boolean,
  mode2: Mode2,
  time: number,
  wordLength: number
) {
  let words = [...english.words];
  if (punctuation) {
    words = punctuations(words);
  }
  if (numbers) {
    words = numbersMode(words);
  }
  if (mode2 === "time") {
    words = words.slice(0, Math.max(100, Math.floor(time / 0.6)));
  } else if (mode2 === "words") {
    words = words.slice(0, wordLength);
  }
  words.sort(() => Math.random() - 0.5);
  return words;
}

export function punctuations(words: string[]) {
  const punctuation = [",", ".", "!", "?", ";", ":", "()", "''"];
  const newWords = [...words];
  for (let i = 0; i < newWords.length; i++) {
    if (Math.random() < 0.6) {
      if (Math.random() < 0.4) {
        const r = punctuation[Math.floor(Math.random() * punctuation.length)];
        if (r === "()") {
          newWords[i] = "(" + newWords[i] + ")";
        } else if (r === "''") {
          newWords[i] = "'" + newWords[i] + "'";
        } else {
          newWords[i] = newWords[i] + r;
        }
      } else {
        newWords[i] =
          newWords[i].charAt(0).toUpperCase() + newWords[i].slice(1);
      }
    }
  }
  return newWords;
}

export function numbersMode(words: string[]): string[] {
  let newWordsString = "";
  for (let i = 0; i < words.length; i++) {
    newWordsString += words[i];
    if (Math.random() < 0.2) {
      let numOfDigits = Math.floor(Math.random() * 3) + 1;
      let randomNumber = Math.floor(Math.random() * Math.pow(10, numOfDigits));
      newWordsString += " " + randomNumber;
    }
    newWordsString += " ";
  }
  return newWordsString.split(" ");
}
