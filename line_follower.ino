int mot1=9;
int mot2=6;
int mot3=5;
int mot4=3;

int left=11;
int right=12;
int led=13;

int Left=0;
int Right=0;

void LEFT (void);
void RIGHT (void);
void STOP (void);

void setup()
{
  pinMode(mot1,OUTPUT);
  pinMode(mot2,OUTPUT);
  pinMode(mot3,OUTPUT);
  pinMode(mot4,OUTPUT);
  pinMode(led,OUTPUT);

  pinMode(left,INPUT);
  pinMode(right,INPUT);
  
  digitalWrite(left,HIGH);
  digitalWrite(right,HIGH);
  
  
}

void loop() 
{
 
 digitalWrite(mot1, HIGH);
 digitalWrite(mot2,LOW);
 digitalWrite(mot3,HIGH);
 digitalWrite(mot4,LOW);
 bling();
 
while(1)
{
  Left=digitalRead(left);
  Right=digitalRead(right);

  if((Left==0 && Right==1)==1)
  LEFT();
  else if((Right==0 && Left==1)==1)
  RIGHT();
}
}

void LEFT (void)
{
    digitalWrite(mot3,LOW);
    digitalWrite(mot4,HIGH);
   
   
   while(Left==0)
   {
    Left=digitalRead(left);
    Right=digitalRead(right);
    if(Right==0)
    {
      int lprev=Left;
      int rprev=Right;
      STOP();
      while(((lprev==Left)&&(rprev==Right))==1)
      {
         Left=digitalRead(left);
         Right=digitalRead(right);
      }
    }
     digitalWrite(mot1,HIGH);
     digitalWrite(mot2,LOW); 
   }
    digitalWrite(mot3,HIGH);
    digitalWrite(mot4,LOW);
}

void RIGHT (void)
{
    digitalWrite(mot1,LOW);
    digitalWrite(mot2,HIGH);

   while(Right==0)
   {
    Left=digitalRead(left);
    Right=digitalRead(right);
    if(Left==0)
    {
      int lprev=Left;
      int rprev=Right;
     STOP();
      while(((lprev==Left)&&(rprev==Right))==1)
      {
         Left=digitalRead(left);
         Right=digitalRead(right);
      }
    }
     digitalWrite(mot3,HIGH);
     digitalWrite(mot4,LOW);
    }
    digitalWrite(mot1,HIGH);
    digitalWrite(mot2,LOW);
}
void STOP (void)
{
 digitalWrite(mot1, LOW);
 digitalWrite(mot2, LOW);
 digitalWrite(mot3, LOW);
 digitalWrite(mot4, LOW);
  
}

void bling (void)
{
  digitalWrite(13,HIGH);
  delay(500);
  digitalWrite(13,LOW);
  delay(300);
  
}
  
