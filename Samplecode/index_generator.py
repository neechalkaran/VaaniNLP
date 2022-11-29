#Index_generator
import requests
from bs4 import BeautifulSoup
from tamil import vaaninlp
urls=["https://tech.neechalkaran.com/2022/11/venmurasu-concordance.html",
      "https://tech.neechalkaran.com/2022/11/blog-post.html",
      "https://tech.neechalkaran.com/2022/09/blog-post.html",
      "https://tech.neechalkaran.com/2018/02/tamil-sorting.html"
      ]  
masterword={}      
for i in range(len(urls)):
  xpage= requests.get(urls[i])  
  xpage.encoding = 'utf-8'
  prose=xpage.text   
  xsoup = BeautifulSoup( xpage.text)#html5lib
  body =xsoup.find("article")  
  sol = vaaninlp.word_tokenize(body.text)
  leng=0
  limit=1500#size of the array size in lemmatize
  word=[]  
  while leng<len(sol):  
    result= vaaninlp.lemmatize(sol[leng:leng+limit])
    leng=leng+limit
    for j in range(len(result)):
      if(result[j]["Flag"]==True):
        word.append(result[j]["RootWords"][0])
      else:
        word.append(result[j]["Userword"])
  word=list(set(word))        
  word=vaaninlp.remove_stopwords(word)  
  for j in word:          
    if(j not in masterword):
      masterword[j]=[]
    masterword[j].append("p"+str(i))
    
for i in masterword:
  print(i + " "+ ",".join(masterword[i]))  
