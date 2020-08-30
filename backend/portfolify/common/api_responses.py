from rest_framework.response import Response
from rest_framework import status


def create_ok_response(data={}):
    return Response(
        {
            "errors": 0,
            "data": data,
        },
        status=status.HTTP_200_OK,
    )


def create_bad_request_response(data={}):
    return Response(
        {
            "errors": 1,
            "data": data,
        },
        status=status.HTTP_400_BAD_REQUEST,
    )


def create_custom_positive_response(data={}, response_status=status.HTTP_200_OK):
    return Response(
        {
            "errors": 0,
            "data": data,
        },
        status=response_status,
    )


def create_custom_negative_response(data={}, response_status=status.HTTP_400_BAD_REQUEST):
    return Response(
        {
            "errors": 1,
            "data": data,
        },
        status=response_status,
    )
