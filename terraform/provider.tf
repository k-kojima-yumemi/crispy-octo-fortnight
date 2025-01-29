terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.84"
    }
    archive = {
      source  = "hashicorp/archive"
      version = "~> 2.7"
    }
  }
  required_version = ">= 1.10.0"
}

provider "aws" {
  region = "ap-northeast-1"
  default_tags {
    tags = {
      Terraform   = true
      Environment = "crispy-octo-fortnight"
    }
  }
}
