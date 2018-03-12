from collections import deque
import numpy as np
import argparse
import imutils
import cv2
import time
from sklearn import linear_model



flag_capture=0
lis1=[]
lis2=[]
dxx=[]
dyy=[]
Lower1 = (26, 105,65 )
Upper1 = (54, 194,255)

Lower2=(138,96,224)
Upper2=(255,183,255)
xx=""
pts1=[]
pts2=[]
count = -1
(dX, dY) = (0, 0)
direction = ""

flag=0
camera = cv2.VideoCapture(0)
count=0
while True:
    count=count+1
    (grabbed, frame) = camera.read()
    if grabbed==False:
        continue;

    if flag_capture==1:
      cv2.imwrite('local.jpeg',frame)
    frame = imutils.resize(frame, width=600)

    hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
    mask1 = cv2.inRange(hsv, Lower1, Upper1)
    mask2 = cv2.inRange(hsv, Lower2, Upper2)
    mask1 = cv2.erode(mask1, None, iterations=2)
    mask2 = cv2.erode(mask2, None, iterations=2)
    mask1 = cv2.dilate(mask1, None, iterations=2)
    mask2 = cv2.dilate(mask2, None, iterations=2)
    cnts1 = cv2.findContours(mask1.copy(), cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE)[-2]
    cnts2 = cv2.findContours(mask2.copy(), cv2.RETR_EXTERNAL,
    cv2.CHAIN_APPROX_SIMPLE)[-2]
    center1 = None
    center2= None
    if len(cnts1) > 0:
       c = max(cnts1, key=cv2.contourArea)
       ((x, y), radius1) = cv2.minEnclosingCircle(c)
       M1 = cv2.moments(c)
       center1 = (int(M1["m10"] / M1["m00"]), int(M1["m01"] / M1["m00"]))

       if radius1 > 20:
          flag=flag+1
          cv2.circle(frame, (int(x), int(y)), int(radius1),(0, 255, 255), 2)
          cv2.circle(frame, center1, 5, (0, 0, 255), -1)
          count=0
          pts1.append(center1)
          lis1.append(center1)
  
    if len(cnts2) > 0:
       c = max(cnts2, key=cv2.contourArea)
       ((x, y), radius2) = cv2.minEnclosingCircle(c)
       M2 = cv2.moments(c)
       center2 = (int(M2["m10"] / M2["m00"]), int(M2["m01"] / M2["m00"]))
       if radius2 > 20:
          flag=flag+1
          cv2.circle(frame, (int(x), int(y)), int(radius2),(0, 255, 255), 2)
          cv2.circle(frame, center2, 5, (0, 0, 255), -1)
          count=0
          pts2.append(center2)
          lis2.append(center2)

          # print center 
    
    # if len(pts)>15:
    #     print '---------------'	
    #     print np.var(np.asarray(pts),axis=0)
    #     count=0
    #     pts=[]
        
    # if for 20 frames green object not there


    for i in np.arange(1, len(pts1)):
        if i!=0:
         cv2.line(frame, pts1[i - 1], pts1[i], (0, 255, 0), 5)
    for i in np.arange(1, len(pts2)):
        if i!=0:
         cv2.line(frame, pts2[i - 1], pts2[i], (128, 84, 231), 5)     
     



    if count>50 and flag_capture==1 and flag>2 :
          print len(pts1)
          var=np.var(np.asarray(pts1),axis=0)
          print var
          if var[0]-var[1]>700 :
             if pts1[0][0]<pts1[-1][0]:
              print "positive x axis"

             else:
               print "negative x axis" 

          if var[1]-var[0]>700 :
            if pts1[-1][1]<pts1[0][1]:
              #print "positive y axis"
              print "send to cloud"

            else:
               print "delete the photo"  

          flag_capture=0;  
          flag=0
          count=0   
          break       
         
    cv2.imshow("Frame", frame)
    key = cv2.waitKey(1) & 0xFF
    if key == ord("q"):
      break
   
    if center1!=None and center2!=None:
      a=abs(center1[0]-center2[0])
      b=abs(center1[1]-center2[1])
      if a<50 and b<50:
         pts1=[]
         pts2=[]
         print 'capture'
         time.sleep(2)
         flag_capture=1;
         flag=0;



camera.release()
cv2.destroyAllWindows()

