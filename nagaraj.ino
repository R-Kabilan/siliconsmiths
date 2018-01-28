
 int ThermistorPin0 = 1;
 
 int led1 = 3;
 int led2 = 5;
 int led3 = 9;
 int buzz = 13;
 int sensor = 10;
void setup() {
 
 Serial.begin(9600);
pinMode(led1,OUTPUT);
pinMode(led2,OUTPUT);
pinMode(led3,OUTPUT);
pinMode(buzz,OUTPUT);
pinMode(sensor,INPUT);
pinMode(2,OUTPUT);
pinMode(4,OUTPUT);
pinMode(8,OUTPUT); 
digitalWrite(2, LOW);
digitalWrite(4, LOW);
digitalWrite(8, LOW);
}

void loop() { 
 
 int input = digitalRead(12);
 int Vo = analogRead(ThermistorPin0); 
 
 if( Vo <= 350)
 {
   digitalWrite(led1, HIGH);
   delay(200);
   digitalWrite(led2, LOW);
   delay(200);
   Serial.print("too much \n");
 }
 
 if( Vo >= 350 && Vo <= 600)
 {
   digitalWrite(led2, HIGH);
   delay(200);
   digitalWrite(led1, LOW);
   delay(200);
   Serial.print("perfect \n");
 }
 
  if( Vo >= 600)
  {
   digitalWrite(led3, HIGH);
   delay(500);
   Serial.print("dry\n");
  }
  
  if( input ==! HIGH)
  {
    digitalWrite(buzz, HIGH);
    delay(200);
  }
  else
  {
  digitalWrite(led1, LOW);
  digitalWrite(led2, LOW);
  digitalWrite(led3, LOW);
  digitalWrite(buzz, LOW);
  }
 Serial.print(Vo);
 delay(100);
 }
