
const int relay = 8;
const int led = 6;
const int Gnd = 2;
const int buzz = 11;
int T,N ;
 
 void relayon(void);
 void relayoff(void);
 void Tempread(int);

void setup() {
 
 Serial.begin(9600); 
  
 pinMode(relay, OUTPUT);
 pinMode(led, OUTPUT);
 pinMode(buzz, OUTPUT);
 pinMode(Gnd, OUTPUT);
 digitalWrite(Gnd, LOW);
  
 }

void loop() { 
 
  //relay control to controll the heater 
 
 relayon(); // turn the relay on
 digitalWrite(buzz, HIGH);
 delay(3000);
 relayoff(); // turn the relay off
  digitalWrite(buzz, LOW); 
 }

void relayon(void)
{
  do
   {
    digitalWrite(relay, HIGH);
    digitalWrite(led, HIGH);
    Tempread(500);
   }
    while( T <= 40);
}

void relayoff(void)
{
  do
   {
    digitalWrite(relay, LOW);
    digitalWrite(led, LOW);
    Tempread(500);
   }
    while( T >= 45);
}

void Tempread(int N)
{
  
 int ThermistorPin0 = 1;
 int ThermistorPin1 = 2;
 int ThermistorPin2 = 3;
 int V0,V1,V2; 
 
 float R = 9870.0 ;
 float Rt,logRt ;
 float Rtk = 3380 ; 
 
 float L = 4578.0 ;
 float Lt,logLt ;
 float Ltk = 3500.0 ;
 
 float C = 24.0 ;
 float Ct,logCt ;
 float Ctk = 2750.0 ;
 
 float T1,T2,T3 ;
 
  //calculate temperature from thermistor1
 V0 = analogRead(ThermistorPin0) ; 
 Rt = R*( 1023.0 / float(V0) - 1.0) ;
 logRt = log(Rt/R) ;
 T1 = 25*(Rtk) /Rtk - 25*(logRt) ;
  
  //calculate temperature from thermistor2
 V1 = analogRead(ThermistorPin1) ; 
 Lt = L*( 1023.0 / float(V1) - 1.0 ) ;
 logLt = log(Lt/L) ;
 T2 = 25*(Ltk) /Ltk - 25*(logLt) ;
  
  //calculate temperature from thermistor3
 V2 = analogRead(ThermistorPin2) ; 
 Ct = C*( 1023.0 / float(V2) - 1.0 ) ;
 logCt = log(Ct/C) ;
 T3 = 25*(Ctk) /Ctk - 25*(logCt) ;
  
  //calculate average temperature
 T = (T1+T2+T3)/3 ;
  
  Serial.println(T);
  Serial.println("\n");
  delay(N);
 
}
