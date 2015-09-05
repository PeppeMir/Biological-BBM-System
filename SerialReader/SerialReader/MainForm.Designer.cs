namespace SerialReader
{
    partial class MainForm
    {
        /// <summary>
        /// Variabile di progettazione necessaria.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Pulire le risorse in uso.
        /// </summary>
        /// <param name="disposing">ha valore true se le risorse gestite devono essere eliminate, false in caso contrario.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Codice generato da Progettazione Windows Form

        /// <summary>
        /// Metodo necessario per il supporto della finestra di progettazione. Non modificare
        /// il contenuto del metodo con l'editor di codice.
        /// </summary>
        private void InitializeComponent()
        {
            this.comboBox_COM = new System.Windows.Forms.ComboBox();
            this.textBox_POST = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.button_run = new System.Windows.Forms.Button();
            this.button_stop = new System.Windows.Forms.Button();
            this.label3 = new System.Windows.Forms.Label();
            this.textBox_log = new System.Windows.Forms.TextBox();
            this.button_clear = new System.Windows.Forms.Button();
            this.SuspendLayout();
            // 
            // comboBox_COM
            // 
            this.comboBox_COM.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.comboBox_COM.FormattingEnabled = true;
            this.comboBox_COM.Location = new System.Drawing.Point(15, 31);
            this.comboBox_COM.Name = "comboBox_COM";
            this.comboBox_COM.Size = new System.Drawing.Size(64, 21);
            this.comboBox_COM.TabIndex = 0;
            // 
            // textBox_POST
            // 
            this.textBox_POST.Location = new System.Drawing.Point(15, 87);
            this.textBox_POST.Name = "textBox_POST";
            this.textBox_POST.Size = new System.Drawing.Size(282, 20);
            this.textBox_POST.TabIndex = 1;
            this.textBox_POST.Text = "http://localhost/php/Updater.php";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(12, 13);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(60, 13);
            this.label1.TabIndex = 2;
            this.label1.Text = "COM ports:";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 68);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(63, 13);
            this.label2.TabIndex = 3;
            this.label2.Text = "POST path:";
            // 
            // button_run
            // 
            this.button_run.Location = new System.Drawing.Point(107, 31);
            this.button_run.Name = "button_run";
            this.button_run.Size = new System.Drawing.Size(50, 23);
            this.button_run.TabIndex = 4;
            this.button_run.Text = "Run";
            this.button_run.UseVisualStyleBackColor = true;
            this.button_run.Click += new System.EventHandler(this.button_run_Click);
            // 
            // button_stop
            // 
            this.button_stop.Enabled = false;
            this.button_stop.Location = new System.Drawing.Point(163, 31);
            this.button_stop.Name = "button_stop";
            this.button_stop.Size = new System.Drawing.Size(50, 23);
            this.button_stop.TabIndex = 5;
            this.button_stop.Text = "Stop";
            this.button_stop.UseVisualStyleBackColor = true;
            this.button_stop.Click += new System.EventHandler(this.button_stop_Click);
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(12, 121);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(28, 13);
            this.label3.TabIndex = 7;
            this.label3.Text = "Log:";
            // 
            // textBox_log
            // 
            this.textBox_log.Location = new System.Drawing.Point(15, 140);
            this.textBox_log.Multiline = true;
            this.textBox_log.Name = "textBox_log";
            this.textBox_log.ScrollBars = System.Windows.Forms.ScrollBars.Both;
            this.textBox_log.Size = new System.Drawing.Size(282, 89);
            this.textBox_log.TabIndex = 6;
            // 
            // button_clear
            // 
            this.button_clear.Location = new System.Drawing.Point(219, 32);
            this.button_clear.Name = "button_clear";
            this.button_clear.Size = new System.Drawing.Size(65, 23);
            this.button_clear.TabIndex = 8;
            this.button_clear.Text = "Clear Log";
            this.button_clear.UseVisualStyleBackColor = true;
            this.button_clear.Click += new System.EventHandler(this.button_clear_Click);
            // 
            // MainForm
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(313, 248);
            this.Controls.Add(this.button_clear);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.textBox_log);
            this.Controls.Add(this.button_stop);
            this.Controls.Add(this.button_run);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.textBox_POST);
            this.Controls.Add(this.comboBox_COM);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.Name = "MainForm";
            this.Text = "Logger";
            this.Load += new System.EventHandler(this.MainForm_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.ComboBox comboBox_COM;
        private System.Windows.Forms.TextBox textBox_POST;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Button button_run;
        private System.Windows.Forms.Button button_stop;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox textBox_log;
        private System.Windows.Forms.Button button_clear;
    }
}

