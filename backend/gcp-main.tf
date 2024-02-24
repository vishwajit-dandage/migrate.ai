provider "google" {
  credentials = file("creds.json")
  project     = "synthetic-cargo-415216"
  zone      = "us-central1-a"  # Update with your desired region
}
 
resource "google_compute_instance" "example" {
  name         = "semicolons-linux"
  machine_type = "e2-medium"  # Update with your desired machine type
 
  tags = ["http-server", "https-server"]
 
  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-11"  # Update with your desired image
      size  = "10"  # Update with your desired disk size in GB
    }
  }
 
  network_interface {
    network = "default"  # Update with your desired network
    access_config {
      // This will create a public IP address for the instance
    }
  }
 
  metadata = {
    ssh-keys = "vishwajit_vrd:ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBKkdtsawHDLNPSLlOpfzAdmEDoa5m/G+JNbhdsQ3qqHnW+YRR6mi58xhU3xkvfUSAck3KFp4DKYmIKQ9aJnIbIo= google-ssh {\"userName\":\"vishwajit.vrd@gmail.com\",\"expireOn\":\"2024-02-24T04:21:02+0000\"}"
  }
}