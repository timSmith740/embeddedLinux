/* boneCV.cpp
 *
 * Copyright Derek Molloy, School of Electronic Engineering, Dublin City University
 * www.derekmolloy.ie
 *
 * Redistribution and use in source and binary forms, with or without modification, are permitted
 * provided that source code redistributions retain this notice.
 *
 * This software is provided AS IS and it comes with no warranties of any type. 
 */

#include<iostream>
#include<fstream>
#include<opencv2/opencv.hpp>
#include "opencv2/objdetect/objdetect.hpp"
#include "opencv2/highgui/highgui.hpp"
#include "opencv2/imgproc/imgproc.hpp"
#include <stdio.h>
using namespace std;
using namespace cv;

 /** Function Headers */
 void detectAndDisplay( Mat frame );

/** Global variables */
 String face_cascade_name = "haarcascade_frontalface_alt.xml";
 String eyes_cascade_name = "haarcascade_eye_tree_eyeglasses.xml";
 CascadeClassifier face_cascade;
 CascadeClassifier eyes_cascade;
 string window_name = "Capture - Face detection";
 RNG rng(12345);

int main()
{
    VideoCapture capture(0);
    capture.set(CV_CAP_PROP_FRAME_WIDTH,320);
    capture.set(CV_CAP_PROP_FRAME_HEIGHT,240);
    
    //-- 1. Load the cascades
   if( !face_cascade.load( face_cascade_name ) ){ printf("--(!)Error loading face\n"); return -1; };
   if( !eyes_cascade.load( eyes_cascade_name ) ){ printf("--(!)Error loading eyes\n"); return -1; };
   
    if(!capture.isOpened()){
	    cout << "Failed to connect to the camera." << endl;
    }
    // Taking a picture
    Mat frame, edges;
    capture >> frame;
    if(frame.empty()){
		cout << "Failed to capture an image" << endl;
		return -1;
    }
    detectAndDisplay( frame );
    cvtColor(frame, edges, CV_BGR2GRAY);
    Canny(edges, edges, 0, 30, 3);
    imwrite("edges.png", edges);
    imwrite("capture.png", frame);
    return 0;
}

/** @function detectAndDisplay */
void detectAndDisplay( Mat frame )
{
  ofstream faceValues;
  std::vector<Rect> faces;
  Mat frame_gray;

  cvtColor( frame, frame_gray, CV_BGR2GRAY );
  equalizeHist( frame_gray, frame_gray );

  //-- Detect faces
  face_cascade.detectMultiScale( frame_gray, faces, 1.1, 2, 0|CV_HAAR_SCALE_IMAGE, Size(30, 30) );
  faceValues.open("faceValues.txt");
  for( size_t i = 0; i < faces.size(); i++ )
  {
      //save to a file
    faceValues << faces[i].x << endl;
    faceValues << faces[i].y << endl;
    faceValues << faces[i].width << endl;
    faceValues <<faces[i].height<<endl;
    
  }
  faceValues.close();
  //-- Show what you got
  imwrite( "face.png", frame );
 }