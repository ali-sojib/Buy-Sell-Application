import 'dart:convert';

import 'package:buy_sell_appliction/constants/error_handling.dart';
import 'package:buy_sell_appliction/constants/global_variable.dart';
import 'package:buy_sell_appliction/constants/utils.dart';
import 'package:buy_sell_appliction/models/product.dart';
import 'package:buy_sell_appliction/provirders/user_provider.dart';
import 'package:flutter/cupertino.dart';
import 'package:provider/provider.dart';
import 'package:http/http.dart' as http;

class HomeServices {
  //for category services
  Future<List<Product>> fetchCategoryProducts({
    required BuildContext context,
    required String category,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    List<Product> productList = [];
    try {
      http.Response res = await http.get(
        Uri.parse('$uri/api/products?category=$category'),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'x-auth-token': userProvider.user.token,
        },
      );
      httpErrorHandel(
        response: res,
        context: context,
        onSuccess: () {
          for (int i = 0; i < jsonDecode(res.body).length; i++) {
            productList.add(
              Product.formJson(
                jsonEncode(
                  jsonDecode(res.body)[i],
                ),
              ),
            );
          }
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString() + 'in home service');
    }
    return productList;
  }

  //for deal of day services
  Future<Product> fetchDealOfDay({
    required BuildContext context,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
    Product product = Product(
      name: '',
      description: '',
      quantity: 0,
      images: [],
      category: '',
      price: 0,
    );

    try {
      http.Response res =
          await http.get(Uri.parse('$uri/api/deal-of-day'), headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'x-auth-token': userProvider.user.token,
      });

      httpErrorHandel(
        response: res,
        context: context,
        onSuccess: () {
          product = Product.formJson(res.body);
        },
      );
    } catch (e) {
      showSnackBar(context, e.toString());
    }
    return product;
  }
}
