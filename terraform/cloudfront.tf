resource "aws_cloudfront_distribution" "main" {
  origin {
    domain_name = regex("https://([^/]+)/", aws_lambda_function_url.lambda.function_url)[0]
    origin_id   = aws_lambda_function_url.lambda.url_id
    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "match-viewer"
      origin_ssl_protocols   = ["TLSv1.2"]
    }
  }
  origin {
    domain_name              = aws_s3_bucket.lambda.bucket_regional_domain_name
    origin_id                = aws_s3_bucket.lambda.bucket_regional_domain_name
    origin_access_control_id = aws_cloudfront_origin_access_control.lambda_s3.id
  }
  // aliases = [local.domain_name]
  enabled         = true
  is_ipv6_enabled = true
  http_version    = "http2and3"
  price_class     = "PriceClass_100"

  default_cache_behavior {
    allowed_methods            = ["HEAD", "GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", ]
    cached_methods             = ["HEAD", "GET"]
    target_origin_id           = aws_lambda_function_url.lambda.url_id
    viewer_protocol_policy     = "redirect-to-https"
    cache_policy_id            = data.aws_cloudfront_cache_policy.no_cache.id
    compress                   = true
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.main.id
  }
  ordered_cache_behavior {
    allowed_methods            = ["HEAD", "GET"]
    cached_methods             = ["HEAD", "GET"]
    path_pattern               = "/favicon.ico"
    target_origin_id           = aws_s3_bucket.lambda.bucket_regional_domain_name
    viewer_protocol_policy     = "redirect-to-https"
    cache_policy_id            = data.aws_cloudfront_cache_policy.cache.id
    compress                   = true
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.main.id
  }
  ordered_cache_behavior {
    allowed_methods            = ["HEAD", "GET"]
    cached_methods             = ["HEAD", "GET"]
    path_pattern               = "/static/*"
    target_origin_id           = aws_s3_bucket.lambda.bucket_regional_domain_name
    viewer_protocol_policy     = "redirect-to-https"
    cache_policy_id            = data.aws_cloudfront_cache_policy.cache.id
    compress                   = true
    response_headers_policy_id = data.aws_cloudfront_response_headers_policy.main.id
  }
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }
  viewer_certificate {
    cloudfront_default_certificate = true
  }
  # viewer_certificate {
  #   acm_certificate_arn            = var.acm_arn
  #   minimum_protocol_version       = "TLSv1.2_2021"
  #   ssl_support_method             = "sni-only"
  #   cloudfront_default_certificate = false
  # }
}

data "aws_cloudfront_cache_policy" "no_cache" {
  name = "Managed-CachingDisabled"
}

data "aws_cloudfront_cache_policy" "cache" {
  name = "Managed-CachingOptimized"
}

data "aws_cloudfront_response_headers_policy" "main" {
  name = "Managed-SecurityHeadersPolicy"
}
