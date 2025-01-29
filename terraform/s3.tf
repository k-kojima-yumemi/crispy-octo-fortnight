resource "aws_s3_bucket" "lambda" {
  bucket = "static-${local.lambda_name}"
}

resource "aws_cloudfront_origin_access_control" "lambda_s3" {
  name                              = "origin_access_control_for_${replace(aws_s3_bucket.lambda.bucket, "-", "_")}"
  description                       = "OAC for ${aws_s3_bucket.lambda.bucket}"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

data "aws_iam_policy_document" "allow_cloudfront" {
  statement {
    sid    = "Allow CloudFront"
    effect = "Allow"
    principals {
      identifiers = ["cloudfront.amazonaws.com"]
      type        = "Service"
    }
    actions   = ["s3:GetObject"]
    resources = ["${aws_s3_bucket.lambda.arn}/*"]
    condition {
      test     = "StringEquals"
      values   = [aws_cloudfront_distribution.main.arn]
      variable = "AWS:SourceArn"
    }
  }
}

resource "aws_s3_bucket_policy" "main" {
  bucket = aws_s3_bucket.lambda.id
  policy = data.aws_iam_policy_document.allow_cloudfront.json
}
