using System;
using System.Collections.Specialized;
using System.IO.Ports;
using System.Net;
using System.Text;
using System.Windows.Forms;

namespace SerialReader
{
    public partial class MainForm : Form
    {
        private SerialPort sp = null;
        delegate void SetTextCallback(string text);

        public MainForm()
        {
            InitializeComponent();
        }

        private void MainForm_Load(object sender, EventArgs e)
        {
            checkCOMports();
        }

        private void checkCOMports()
        {
            string[] ports = SerialPort.GetPortNames();

            foreach (string port in ports)
            {
                this.comboBox_COM.Items.Add(port);
            }

            this.comboBox_COM.SelectedIndex = 0;
        }

        private void button_run_Click(object sender, EventArgs e)
        {
            this.button_run.Enabled = false;
            this.button_stop.Enabled = true;
            this.textBox_log.Text = "";

            sp = new SerialPort(this.comboBox_COM.SelectedItem.ToString());

            sp.BaudRate = 115200;
            sp.Parity = Parity.None;
            sp.StopBits = StopBits.One;
            sp.DataBits = 8;
            sp.Handshake = Handshake.None;

            sp.DataReceived += new SerialDataReceivedEventHandler(DataReceivedHandler);

            sp.Open();

            appendOnLog("Reading running...");
        }

        private void appendOnLog(string s)
        {
            if (this.textBox_log.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(appendOnLog);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                this.textBox_log.Text += s + Environment.NewLine;
                this.textBox_log.Select(this.textBox_log.Text.Length, 0);
                this.textBox_log.ScrollToCaret();
            }
        }

        private void button_stop_Click(object sender, EventArgs e)
        {
            try
            {
                sp.Close();
                sp.DataReceived -= new SerialDataReceivedEventHandler(DataReceivedHandler);
                sp.Dispose();
                sp = null;

                this.button_run.Enabled = true;
                this.button_stop.Enabled = false;
                appendOnLog("Reading stopped...");
            }
            catch
            {

            }
        }

        private void DataReceivedHandler(object sender, SerialDataReceivedEventArgs e)
        {
            try
            {
                SerialPort sp = (SerialPort)sender;
                string indata = sp.ReadLine();
                
                if (indata.Substring(0, 1) == "\r")
                {
                    indata = indata.Substring(1);
                }

                appendOnLog(indata);
                postDataOnServer(indata);
            }
            catch
            {

            }
        }

        private void postDataOnServer(string serialString)
        {
            using (var client = new WebClient())
            {
                string[] values = serialString.Split(new char[]{','});

                // restrict on one digit after the point
                values[1] = values[1].Substring(0, values[1].Length - 2);
                values[2] = values[2].Substring(0, values[2].Length - 2);
                values[3] = values[3].Substring(0, values[3].Length - 3);   // also "\r"

                var POSTvalues = new NameValueCollection();
                string minutes = ((DateTime.Now.Minute.ToString().Length == 1) ? "0" + DateTime.Now.Minute : DateTime.Now.Minute.ToString());

                POSTvalues["id"] = values[0];
                POSTvalues["timestamp"] = DateTime.Now.Day + "/" + DateTime.Now.Month + " " + DateTime.Now.Hour + ":" + minutes;
                POSTvalues["temperature"] = values[1];
                POSTvalues["humidity"] = values[2];
                POSTvalues["voltage"] = values[3];

                var response = client.UploadValues(this.textBox_POST.Text, POSTvalues);
                var responseString = Encoding.Default.GetString(response);
            }
        }

        private void button_clear_Click(object sender, EventArgs e)
        {
            this.textBox_log.Text = "";
        }
    }
}
