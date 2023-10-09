
void setup() {
  Serial.begin( 9600 );
  pinMode(11, OUTPUT);
  pinMode(2, INPUT);
}

void loop() {
    
    if(digitalRead(2) == HIGH){
      Serial.println("FIREEE");
      digitalWrite(11, HIGH);
      delay(500);
      digitalWrite(11, LOW);
      delay(500);
    }
    else{
      Serial.println("No Heat");
      delay(500);
    }
}
  

