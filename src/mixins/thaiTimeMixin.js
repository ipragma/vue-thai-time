export const thaiTimeMixin = {
  data() {
    return {
      // https://www.into-asia.com/thai_language/reference/time.php
      numbersForTime: [
        { // 0
          english: { number: "0", word: "zero", phonetic: "" },
          thai: { number: "๐", word: "ศูนย์", phonetic: "soŏn" }
        },
        { // 1
          english: { number: "1", word: "one", phonetic: "" },
          thai: { number: "๑", word: "หนึ่ง", phonetic: "nèung" }
        },
        { // 2
          english: { number: "2", word: "two", phonetic: "" },
          thai: { number: "๒", word: "สอง", phonetic: "sŏng" }
        },
        { // 3
          english: { number: "3", word: "three", phonetic: "" },
          thai: { number: "๓", word: "สาม", phonetic: "săam" }
        },
        { // 4
          english: { number: "4", word: "four", phonetic: "" },
          thai: { number: "๔", word: "สี่", phonetic: "sèe" }
        },
        { // 5
          english: { number: "5", word: "five", phonetic: "" },
          thai: { number: "๕", word: "ห้า", phonetic: "hâa" }
        },
        { // 6
          english: { number: "6", word: "six", phonetic: "" },
          thai: { number: "๖", word: "หก", phonetic: "hòk" }
        },
        { // 7
          english: { number: "7", word: "seven", phonetic: "" },
          thai: { number: "๗", word: "เจ็ด", phonetic: "jèt" }
        },
        { // 8
          english: { number: "8", word: "eight", phonetic: "" },
          thai: { number: "๘", word: "แปด", phonetic: "bpàet" }
        },
        { // 9
          english: { number: "9", word: "nine", phonetic: "" },
          thai: { number: "๙", word: "เก้า", phonetic: "gâo" }
        },
        { // 10
          english: { number: "10", word: "ten", phonetic: "" },
          thai: { number: "๑๐", word: "สิบ", phonetic: "sìp" }
        },
        { // 11
          english: { word: "", phonetic: "" },
          thai: { word: "เอ็ด", phonetic: "èt" }
        },
        { // 12
          english: { number: "20", word: "twenty", phonetic: "" },
          thai: { number: "๒๐", word: "ยี่ สิบ", phonetic: "yêe-sìp" }
        },
        { // 13
          english: { number: "", word: "half", phonetic: "" },
          thai: { number: "", word: "ครึ่ง", phonetic: "krêung" }
        }
      ],
      
      wordsForTime: [
        { // 0
          english: { word: "midnight", phonetic: "" },
          thai: { word: "เที่ยง คืน", phonetic: "tîang keun" }
        },
        { // 1
          english: { word: "", phonetic: "" },
          thai: { word: "ตี", phonetic: "dtee" }
        },
        { // 2
          english: { word: "", phonetic: "" },
          thai: { word: "เช้า", phonetic: "cháo" }
        },
        { // 3
          english: { word: "noon", phonetic: "" },
          thai: { word: "เที่ยง", phonetic: "tîang" }
        },
        { // 4
          english: { word: "", phonetic: "" },
          thai: { word: "บ่าย", phonetic: "bàai" }
        },
        { // 5
          english: { word: "", phonetic: "" },
          thai: { word: "เย็น", phonetic: "yen" }
        },
        { // 6
          english: { word: "", phonetic: "" },
          thai: { word: "ทุ่ม", phonetic: "tûm" }
        },
        { // 7
          english: { word: "o'clock", phonetic: "" },
          thai: { word: "โมง", phonetic: "mohng" }
        },
        { // 8
          english: { word: "minute", phonetic: "" },
          thai: { word: "นาที", phonetic: "na-thee" }
        }
      ]
    };
  },

  computed: {
    getNumbersForTime() {
      this.numbersForTime.map((x) => x.class = "number");
      return this.numbersForTime;
    },
    getWordsForTime() {
      this.wordsForTime.map((x) => x.class = "word")
      return this.wordsForTime;
    }
  },

  /*eslint-disable no-fallthrough*/ 
  methods: {
    hourInThai(date) {
      let n = this.getNumbersForTime;
      let w = this.getWordsForTime;

      let hour = date.getHours();
      let hourInThai = [];
      switch(hour) {
        case 0:
          hourInThai.push([w[0]]);
          break;
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          hourInThai.push([w[1], n[hour]]);
          break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
          hourInThai.push([n[hour], w[7], w[2]]);
          hourInThai.push([n[hour], w[7]]);
          break;
        case 11:
          hourInThai.push([n[10], n[hour], w[7], w[2]]);
          hourInThai.push([n[10], n[hour], w[7]]);
          break;
        case 12:
          hourInThai.push([w[3]]);
          break;
        case 13:
          hourInThai.push([w[4], w[7]]);
        case 14:
        case 15:
          hourInThai.push([w[4], n[hour-12], w[7]]);
          hourInThai.push([w[4], n[hour-12]]);
          break;
        case 16:
        case 17:
        case 18:
          hourInThai.push([n[hour-12], w[7], w[5]]);
          break;
        case 19:
          hourInThai.push([w[6], n[hour-18]]);
        case 20:
        case 21:
        case 22:
        case 23:
          hourInThai.unshift([n[hour-18], w[6]]);
          break;
        default:
          // code block
      }
      // console.log(hourInThai[0].map((x) => x.thai.word))
      // console.log(hourInThai)
      return hourInThai;
    },

    minuteInThai(date) {
      let n = this.getNumbersForTime;
      let w = this.getWordsForTime;

      let minute = ("0" + date.getMinutes()).slice(-2).toString().split("").map((x) => +x);
      n[0] = null;
      let minute1 = (minute[0] > 0 && minute[1] == 1) ? n[11] : n[minute[1]];
      let minuteInThai = [];
      switch(minute[0]) {
        case 0:
          minuteInThai = [minute1];
          break;
        case 1:
          minuteInThai = [n[10], minute1];
          break;
        case 2:
          minuteInThai = [n[12], minute1];
          break;
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
          minuteInThai = [n[minute[0]], n[10], minute1];
          break;
        default:
          // code block
      }
      minuteInThai = minuteInThai.filter(Boolean);
      if (minuteInThai.length > 0) {
        minuteInThai = [minuteInThai.concat(w[8]), minuteInThai];
      }
      if (minute.join("") == "30") {
        minuteInThai.unshift([n[13]]);
      }
      // console.log(minuteInThai[0].map((x) => x.thai.word))
      // console.log(minuteInThai)

      return minuteInThai;
    },

    timeInThai(date) {
      let timeInThai = [];
      let hourInThai = this.hourInThai(date);
      let minuteInThai = this.minuteInThai(date);
      for(let i=0; i<hourInThai.length; i++) {
        if(minuteInThai.length > 0) {
          for(let j=0; j<minuteInThai.length; j++) {
            let timeConcat = hourInThai[i].concat(minuteInThai[j]);
            timeInThai.push(timeConcat);
            // console.log(timeConcat.map((x) => x.thai.word))
          }  
        } else {
          let timeConcat = hourInThai[i];
          timeInThai.push(timeConcat);
          // console.log(timeConcat.map((x) => x.thai.word))
        }
      }
      // console.log(timeInThai)
      return timeInThai;
    }
  },
};
