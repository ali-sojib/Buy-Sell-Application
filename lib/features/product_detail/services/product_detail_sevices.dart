import 'dart:convert';

import 'package:buy_sell_appliction/constants/error_handling.dart';
import 'package:buy_sell_appliction/constants/global_variable.dart';
import 'package:buy_sell_appliction/constants/utils.dart';
import 'package:buy_sell_appliction/models/product.dart';
import 'package:buy_sell_appliction/models/user.dart';
import 'package:buy_sell_appliction/provirders/user_provider.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ProductDetailServices {
  void addToCart({
    required BuildContext context,
    required Product product,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    try {
      http.Response res = await http.post(
        Uri.parse('$uri/api/add-to-cart'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': userProvider.user.token,
        },
        body: jsonEncode(
          {'id': product.id!},
        ),
      );

      // httpErrorHandel(
      //   response: res,
      //   context: context,
      //   onSuccess: () {
      //     // User user =
      //   },
      // );
    } catch (e) {}
  }

  void rateProduct({
    required BuildContext context,
    required Product product,
    required double rating,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    try {
      http.Response res = await http.post(
        Uri.parse('$uri/api/rate-product'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': userProvider.user.token,
        },
        body: jsonEncode({
          'id': product.id!,
          'rating': rating,
        }),
      );

      httpErrorHandel(
        response: res,
        context: context,
        onSuccess: () {
          showSnackBar(context, 'Thank you for rating');
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
