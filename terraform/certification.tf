// If you want to attach custom domain and SSL certification, please use these resources

# resource "aws_acm_certificate" "main" {
#   domain_name       = local.domain_name
#   validation_method = "DNS"
#   lifecycle {
#     create_before_destroy = true
#   }
# }

# Example for cloudflare (v4 provider)
# resource "cloudflare_record" "certifications" {
#   for_each = {
#     for dvo in aws_acm_certificate.main.domain_validation_options : dvo.domain_name => {
#       name   = dvo.resource_record_name
#       record = dvo.resource_record_value
#       type   = dvo.resource_record_type
#     }
#   }
#   name    = each.value.name
#   type    = each.value.type
#   content = each.value.record
#   zone_id = var.main_zone_id
#   proxied = false
#   comment = "ACM validation for ${local.vrt_resource_domain}"
# }
#
# resource "aws_acm_certificate_validation" "main" {
#   certificate_arn = aws_acm_certificate.main.arn
#   depends_on      = [cloudflare_record.certifications]
# }
