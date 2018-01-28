#include <dht.h>
#include <LiquidCrystal.h>

const int buzz = 10;
const int LED1 = 13;
const int LED2 = 8;
const int relay = 7;
const int GND = 9;
const int rs = 12, en = 11, d4 = 5, d5 = 4, d6 = 3, d7 = 2;
LiquidCrystal lcd(rs, en, d4, d5, d6, d7);

dht DHT;
float sm;
float am;
float atemp;
float wtemp;
int lt;
int gs;

float moisture_sen(int);
float air_hum(int);
float air_temp(int);
int light_sen(int);
float temp_sen(int);
int gas_sen(int);
void relay_on(int );
void buzz_on(int );
void LED1_on(int );
void LED2_on(int);
void lcd_print();

void setup()
{
  Serial.begin(9600);
  pinMode(buzz, OUTPUT);
  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(relay, OUTPUT);
  pinMode(relay, OUTPUT);
  pinMode(GND, OUTPUT);
  digitalWrite(GND, LOW);
  analogWrite(A5, 0);
  lcd.begin(16, 2);

}

void loop()
{





  if (moisture_sen(10) <= 90 )
  {
    buzz_on(1);
    delay(1000);
    buzz_on(0);
    do
    {
      relay_on(1);
      lcd_print();
      moisture_sen(10);
      temp_sen(10);
      light_sen(10);
    }
    while (moisture_sen(10) <= 90  );
  }

  else
  {
    buzz_on(1);
    delay(1500);
    buzz_on(0);
    do
    {
      relay_on(0);
      lcd_print();
      moisture_sen(10);
      temp_sen(10);
      light_sen(10);
    }
    while (moisture_sen(10) >= 90 );
  }
}





float moisture_sen(int n)      //function to sense water moisture
{
  float so;
  so = analogRead(A0);
  if (so <= 1024 && so >= 1007)
  {
    return so / 134.2;
  }
  if (so < 1007 && so >= 972.5)
  {
    return so / 55.5;
  }
  if (so < 972.5 && so >= 725)
  {
    return so / 32.3;
  }
  if (so < 725 && so >= 387.5)
  {
    return so / 15.4;
  }
  if (so < 387.5 && so >= 272)
  {
    return so / 9.2;
  }
  if (so < 272 && so >= 264)
  {
    return so / 20.7;
  }
  else
  {
    return 99;
  }
  delay(n);
}


float air_hum(int n) // fn to measure air moisture
{
  DHT.read11(A4);
  float ho = DHT.humidity;
  return (ho + 10) / 100;
  delay(n);
}


float air_temp(int n) // fn to measure atmospheric temp
{
  DHT.read11(A4);
  float t1 = DHT.temperature;
  return t1 / 10  ;
  delay(n);
}


int light_sen(int n)  // fn to measure light intensity day or night
{
  float vo, lr;
  vo = analogRead(A2);
  lr = 9870 * ((1024 / vo) - 1);
  if ((lr / 100 > 3.5))
  {
    return 1;
  }
  else
  {
    return 0;
  }
  delay(n);
}



float temp_sen(int n) //sen temp
{
  float po, to, vo;
  po = analogRead(A1);
  vo = (po / 1024) * 5 ;
  to = vo * 10;
  return to;
  delay(n);
}


int gas_sen(int n) // smoke detector
{

  float gs = analogRead(A3);

  if (gs > 150)
  {
    return 1;
  }
  else
  {
    Serial.print(" ");
  }
  delay(n);
}


void relay_on(int a)
{
  if (a == 1)
  {
    digitalWrite(relay, HIGH);
  }
  if (a == 0)
  {
    digitalWrite(relay, LOW);
  }
  else
  {
    Serial.print(" ");
  }
}

void buzz_on(int b)
{
  if (b == 1)
  {
    digitalWrite(buzz, HIGH);
  }
  if (b == 0)
  {
    digitalWrite(buzz, LOW);
  }
  else
  {
    Serial.print(" ");
  }
}


void LED1_on(int b)
{
  if (b == 1)
  {
    digitalWrite(LED1, HIGH);
  }
  if (b == 0)
  {
    digitalWrite(LED1, LOW);
  }
  else
  {
    Serial.print(" ");
  }
}


void LED2_on(int a)
{
  if (a == 1)
  {
    digitalWrite(LED2, HIGH);
  }
  if (a == 0)
  {
    digitalWrite(LED2, LOW);
  }
  else
  {
    Serial.print(" ");
  }
}

void lcd_print()
{

  // the below code is used to display the various sensor readings.

  {
    lcd.setCursor(0, 0);
    lcd.print("moisture");
    lcd.setCursor(0, 1);
    lcd.print(moisture_sen(10));
    lcd.setCursor(9, 0);
    lcd.print("watertemp");
    lcd.setCursor(9, 1);
    lcd.print(temp_sen(110));
  }

  delay(1000);
  lcd.clear();

  {
    lcd.setCursor(0, 0);
    lcd.print("airtemp");
    lcd.setCursor(0, 1);
    lcd.print(air_temp(10));
    lcd.setCursor(9, 0);
    lcd.print("humidity");
    lcd.setCursor(9, 1);
    lcd.print(air_hum(10));
  }
  delay(1000);
  lcd.clear();

  {
    lcd.setCursor(0, 0);
    lcd.print("light");
    lcd.setCursor(0, 1);

    {
      lt = light_sen(10);
      if ( lt == 0)
        lcd.print("sunlight");
      else
        lcd.print("shady");
    }

    lcd.setCursor(9, 0);
    lcd.print("smoke");
    lcd.setCursor(9, 1);
    {
      gs = gas_sen(10);
      if ( gs == 0)
        lcd.print("smoke");
      else
        lcd.print("clean");
    }
  }
  delay(1000);
  /*  for (int positionCounter = 0; positionCounter < 2; positionCounter++)
    {
    lcd.scrollDisplayRight();
    delay(1000);
    }


    }
  */
}


