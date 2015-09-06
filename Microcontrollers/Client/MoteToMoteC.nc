#include "MoteToMote.h"
#include <Timer.h>
#include <stdio.h>
#include <string.h>
#include <math.h>

#define READING_INTERVAL 3000
#define SINK_ID 1

module MoteToMoteC
{
	// Generic interfaces
	uses
	{
		interface Boot;
		interface Leds;
		interface Timer<TMilli>;
	}

	// Radio interfaces
	uses
	{
		interface Packet;
		interface AMPacket;
		interface AMSend;
		interface SplitControl as AMControl;
	}
	
	//Temperature, Humidity and Voltage Sensor Board interfaces
	uses
	{
		interface Read<uint16_t> as TempRead;
		interface Read<uint16_t> as HumRead;
		interface Read<uint16_t> as VoltageRead;
	}
}

implementation
{
	// Variables
	bool _radioBusy = FALSE;
	message_t _packet;
	float tmp_temperature, tmp_humidity, tmp_voltage;
	 
	// Events Handlers
	event void Boot.booted()
	{
		call Timer.startPeriodic(READING_INTERVAL);
		call AMControl.start();	// invoke "startDone"
	}

	event void AMControl.stopDone(error_t error)
	{
		//
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
	
	event void Timer.fired()
	{
		// start reading temerature
		call TempRead.read();
	}
	
	void sendPacketToSink()
	{
		if (_radioBusy == FALSE)	
		{
			// create the packet
			MoteToMoteMsg_t *msg = call Packet.getPayload(&_packet, sizeof(MoteToMoteMsg_t));
			msg->nodeID = TOS_NODE_ID;	// set by compiler
			msg->temperature = (u_int16_t)(tmp_temperature * 1000);
			msg ->humidity = (u_int16_t)(tmp_humidity * 1000);
			msg->voltage = (u_int16_t)(tmp_voltage * 1000);
			
			// send the packet (invoke "sendDone")
			if (call AMSend.send(SINK_ID, &_packet, sizeof(MoteToMoteMsg_t)) == SUCCESS)
			{
				_radioBusy = TRUE;				
			}	
		}
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
		
		if (flag == 't')
			printf("Sensor %d - current temperature: %ld.%d%d%d\r\n", TOS_NODE_ID, fi, (uint8_t) f0, (uint8_t) f1, (uint8_t) f2); 
		else
			if (flag == 'h')
				printf("Sensor %d - current humidity: %ld.%d%d%d%%\r\n", TOS_NODE_ID, fi, (uint8_t) f0, (uint8_t) f1, (uint8_t) f2); 
			else
				printf("Sensor %d - current voltage: %ld.%d%d%dV\r\n", TOS_NODE_ID, fi, (uint8_t) f0, (uint8_t) f1, (uint8_t) f2);
	}
   
	event void TempRead.readDone(error_t result, uint16_t val)
	{		
		if (result == SUCCESS)
		{ 
			// store current temperature
			tmp_temperature = (float)(-39.60 + 0.01 * val);
			printfFloat(tmp_temperature,'t');
			
			// start reading voltage
			call VoltageRead.read();
		}
		else 
		{ 
			printf("Sensor %d: Temperature reading error\n\r", TOS_NODE_ID);
		}		
	}

	event void VoltageRead.readDone(error_t result, uint16_t val)
	{
		if (result == SUCCESS)
		{
			tmp_voltage = (float)(val * 3.0 / 4096.0);
			printfFloat(tmp_voltage, 'v');
			
			// start reading humidity
			call HumRead.read();
		}
		else 
		{ 
			printf("Sensor %d: Voltage reading error\n\r", TOS_NODE_ID);
		}
	}

	event void HumRead.readDone(error_t result, uint16_t val)
	{
		if (result == SUCCESS)
		{
			// store current humidity
			tmp_humidity = (float)(-4 + 0.0405 * val + (-2.8 * pow(10,-6)) * pow(val,2));
			printfFloat(tmp_humidity,'h');
			
			// signal correct reading for temperature + humidity (blue led on telodb)
			call Leds.led2Toggle();
			
			// send packet
			sendPacketToSink();
		}
		else
		{
			printf("Sensor %d: Humidity reading error\n\r", TOS_NODE_ID);	
		}	
	}
	
	event void AMSend.sendDone(message_t *msg, error_t error)
	{
		// check send status
		if (error == FAIL || error == ECANCEL)
		{
			call Leds.led0Off();
			return;
		}
		
		// after the packet is sent, "free" the radio and signal event on gold led
		if (error == SUCCESS && msg == &_packet)
		{
			_radioBusy = FALSE;
			call Leds.led1Toggle();
		}				
	}	
}