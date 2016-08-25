# -*- coding:utf-8 -*-
__author__ = '97696'
if __name__=="__main__":
    for i in range(10,24):
        if(i<10):
            ob="0"+str(i);
        else:
            ob=str(i);
        f = open(ob+".txt",'r')
        f1 =open(ob+"_extract.json","w")
        lines=f.readlines()
        f1.write("{\"road\":[")
        for line in lines:
            line=line.split(',')
            newline="{\"time\":\""+line[2]+"\","+"\"ID\":\""+line[3]+line[6]+line[4]+"\","+"\"UsedTime\":\""+line[7]+"\","+"\"Crowded\":\""+line[8]+"\"},"
            f1.write(newline+'\n')
        f1.write("]}");
        f.close()
        f1.close()