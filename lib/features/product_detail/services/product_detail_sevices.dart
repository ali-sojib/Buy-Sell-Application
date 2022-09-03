import 'package:buy_sell_appliction/models/product.dart';
import 'package:buy_sell_appliction/provirders/user_provider.dart';
import 'package:provider/provider.dart';
import 'package:flutter/material.dart';

class ProductDetailServices {
  void rateProduct({
    required BuildContext context,
    required Product product,
    required double rating,
  }) async {
    final userProvider = Provider.of<UserProvider>(context, listen: false);
  }
}
