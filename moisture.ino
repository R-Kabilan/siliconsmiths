
void setup() 
{
  Serial.begin(9600);
}

void loop() 
{  
  

 Serial.println(moisture_sen());
 delay(1000);
}
 
 float moisture_sen()
 {
  float so;
  so=analogRead(A0);
  if(so<=1024&&so>=1007)
  {
    return so/134.2;
  }
  if(so<1007&&so>=972.5)
  {
    return so/55.5;
  }
  if(so<972.5&&so>=725)
  {
    return so/22.3;
  }
  if(so<725&&so>=387.5)
  {
    return so/7.04;
  }
  if(so<387.5&&so>=272)
  {
    return so/3.2;
  }
  if(so<272&&so>=264)
  {
    return so/2.7;
  }
  else
  {
  return 99;
  }
  
 }

