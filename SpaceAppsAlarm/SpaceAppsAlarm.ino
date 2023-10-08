
void setup() {
  Serial.begin( 9600 );
  pinMode(11, OUTPUT);
}

void loop() {

Serial.println("YAY");
digitalWrite(11, HIGH);
delay(1000);
digitalWrite(11, LOW);
delay(1000);

}
