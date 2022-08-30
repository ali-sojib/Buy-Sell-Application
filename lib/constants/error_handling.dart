import 'dart:convert';

import 'package:buy_sell_appliction/constants/utils.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;

void httpErrorHandel({
  required http.Response response,
  required BuildContext context,
  required VoidCallback onSuccess,
}) {
  switch (response.statusCode) {
    case 200:
      onSuccess();
      break;
    case 400:
      showSnackBar(
          context, jsonDecode(response.body)['msg'] + " msg : :400:::");
      break;
    case 500:
      showSnackBar(
          context, jsonDecode(response.body)['error'] + " error : :500:::");
      break;
    default:
      showSnackBar(context, response.body + " body : ::::");
  }
}
