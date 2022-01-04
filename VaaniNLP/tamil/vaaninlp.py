#vaaninlp

import regex
import requests 
import os

def char_tokenize(text):
  chars = regex.findall(r"\p{L}\p{M}*",text)
  return chars

def word_tokenize(text):
  words = regex.findall("[ஂ-௺]+",text)
  return words

def spellcheck(words, Vaani_api=""):
  URL = "http://vaani.neechalkaran.com/spellcheck"
  if(Vaani_api!=""):
    URL = "http://vaani.neechalkaran.com/v2/spellcheck"
  r = requests.post(url = URL, data={"tamilwords":"|".join(words),"sandhi":"true","translated":"true","unicode_error":"true","apikey":Vaani_api})
  data = r.json() 
  return(data)

def lemmatize(words):
  URL = "http://vaani.neechalkaran.com/v2/parse"
  r = requests.post(url = URL, data={"tamilwords":"|".join(words)})
  data = r.json() 
  for i in range(len(data)):
    for j in range(len(data[i]["RootWords"])):
      data[i]["RootWords"][j]=data[i]["RootWords"][j].split("+")[0]
  return(data)

def delemmatize(word,suffix):
  URL = "http://vaani.neechalkaran.com/v2/build"
  r = requests.post(url = URL, data={"tamilwords":word+"|"+suffix})
  data = r.json() 
  return(data)

def sort(words):  
  words.sort(key=lambda b: weight(b))
  return (words)
def weight(a):
  map="அஆஇஈஉஊஎஏஐஒஓஔஔஃகஙசஞடணதநபமயரலவழளறனஜஶஷஸஹௐ"
  result=0
  for i in range(len(a)):
    index=map.find(a[i])
    if(index<0):
      index=ord(a[i])-2946
      if(index>99):index=0 
    result=result+(index/(100**i))
  return result

def remove_stopwords(words):
  stop_words_list = open(os.path.dirname(os.path.abspath(__file__))+"/stop_words.txt", "r").read().split("\n")
  new_words =[]
  for i in words:
    if i not in stop_words_list:
        new_words.append(i)
  return(new_words)

