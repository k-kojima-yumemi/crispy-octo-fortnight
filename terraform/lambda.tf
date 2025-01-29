resource "aws_lambda_function" "main" {
  function_name    = local.lambda_name
  role             = aws_iam_role.lambda.arn
  architectures    = ["arm64"]
  package_type     = "Zip"
  filename         = data.archive_file.lambda.output_path
  source_code_hash = data.archive_file.lambda.output_base64sha256
  runtime          = "nodejs22.x"
  handler          = "entrypoint.handler"
  lifecycle {
    ignore_changes = [
      source_code_hash,
      environment,
    ]
  }
}

resource "aws_lambda_function_url" "lambda" {
  authorization_type = "NONE"
  function_name      = aws_lambda_function.main.arn
}

resource "aws_cloudwatch_log_group" "lambda" {
  name              = "/aws/lambda/${local.lambda_name}"
  retention_in_days = 365
}

resource "aws_iam_role" "lambda" {
  name               = "${local.lambda_name}-role"
  assume_role_policy = data.aws_iam_policy_document.lambda_assume_role.json
}

data "archive_file" "lambda" {
  source_file = "${path.module}/entrypoint.mjs"
  output_path = "${path.module}/entrypoint.zip"
  type        = "zip"
}

data "aws_iam_policy_document" "lambda_assume_role" {
  statement {
    effect = "Allow"
    principals {
      identifiers = ["lambda.amazonaws.com"]
      type        = "Service"
    }
    actions = ["sts:AssumeRole"]
  }
}

data "aws_iam_policy_document" "lambda" {
  statement {
    effect = "Allow"
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents",
    ]
    resources = ["${aws_cloudwatch_log_group.lambda.arn}:*"]
  }
}

resource "aws_iam_role_policy" "lambda" {
  name   = "lambda-policy"
  policy = data.aws_iam_policy_document.lambda.json
  role   = aws_iam_role.lambda.name
}
