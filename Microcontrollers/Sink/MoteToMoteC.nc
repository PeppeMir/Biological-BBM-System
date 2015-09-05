#include "MoteToMote.h"
#include <stdio.h>
#include <string.h>
	
module MoteToMoteC
{
	// Generics interfaces
	uses
	{
		interface Boot;
		interface Leds;
	}
	
	// Radio interfaces
	uses
	{
		interface Packet;
		interface AMPacket;
		interface AMSend;
		interface SplitControl as AMControl;
		interface Receive;
	}	
}

implementation
{
	// Variables
	message_t _packet;
	float tmp_temperature, tmp_humidity, tmp_voltage;
	
	// Events Handlers
	event void Boot.booted()
	{
		call AMControl.start();	// invoke "startDone"
	}

	event void AMControl.startDone(error_t error)
	{
		if (error == SUCCESS)
		{
			call Leds.led0On();
		}
		else
		{
			call AMControl.start();
		}		
	}
	
	event void AMSend.sendDone(message_t *msg, error_t error)
	{
	
	}

	event void AMControl.stopDone(error_t error)
	{
		
	}
	
	void printfFloat(float toBePrinted, char flag) 
	{
		uint32_t fi, f0, f1, f2;
		float f = toBePrinted;

		// integer portion.
		fi = (uint32_t) f;

		// decimal portion...get index for up to 3 decimal places.
		f = f - ((float) fi);
		f0 = f*10;   f0 %= 10;
		f1 = f*100;  f1 %= 10;
		f2 = f*1000; f2 %= 10;
		
		if (flag == 't' || flag == 'h')
			printf("%ld.%d%d%d,", fi, (uint8_t) f0, (uint8_t) f1, (uint8_t) f2); 
		else
			printf("%ld.%d%d%d\r\n", fi, (uint8_t) f0, (uint8_t) f1, (uint8_t) f2); 		
	}
	
	event message_t * Receive.receive(message_t *msg, void *payload, uint8_t len)
	{
		if (len == sizeof(MoteToMoteMsg_t))
		{
			// build received packet
			MoteToMoteMsg_t *incomingPacket = (MoteToMoteMsg_t*) payload;
			tmp_temperature = (float)(((float)incomingPacket->temperature) / 1000.0);
			tmp_humidity = (float)(((float)incomingPacket->humidity) / 1000.0);
			tmp_voltage = (float)(((float)incomingPacket->voltage) / 1000.0);
			
			// signal received packet on led 2 (blue)
			call Leds.led2Toggle();
			
			printf("%d,", incomingPacket->nodeID);
			printfFloat(tmp_temperature, 't');
			printfFloat(tmp_humidity, 'h');
			printfFloat(tmp_voltage, 'v');
		}
		
		return msg;
	}
}