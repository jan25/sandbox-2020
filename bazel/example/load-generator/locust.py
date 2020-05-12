#
# Docs on locust are here:
# https://docs.locust.io/en/stable/writing-a-locustfile.html
#
# This was a failure. Wrote a bash script instead
#

from locust import HttpLocust, TaskSet, task, constant

class MyTaskSet(TaskSet):
    def get_password(self):
        self.client.get("google.com")

class MyLocust(HttpLocust):
    task_set = MyTaskSet
    wait_time = constant(2)
