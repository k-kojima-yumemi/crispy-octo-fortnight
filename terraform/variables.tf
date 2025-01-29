locals {
  lambda_name = "crispy-octo-fortnight"
  domain_name = var.domain_name
}

variable "domain_name" {
  type    = string
  default = "example.com"
}
