import 'package:buy_sell_appliction/constants/error_handling.dart';
import 'package:buy_sell_appliction/constants/utils.dart';
import 'package:buy_sell_appliction/models/product.dart';
import 'package:buy_sell_appliction/provirders/user_provider.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ProductDetailServices {
  void rateProduct({
    required BuildContext context,
    required Product product,
    required double rating,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);

    try {
      http.Response res = await http.post(Uri.parse('$uri/admin/add-product'),
          headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'x-auth-token': userProvider.user.token,
          },
          body: product.toJson());

      httpErrorHandel(
        response: res,
        context: context,
        onSuccess: () {
          showSnackBar(context, 'Product Added Successfully');
          Navigator.pop(context);
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
  }
}
