#include <sys/socket.h> /* basic socket definitions */
#include <sys/types.h> 
#include <signal.h> 
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <arpa/inet.h> 
#include <stdarg.h>
#include <errno.h>
#include <fcntl.h>
#include <sys/time.h>
#include <sys/ioctl.h>
#include <netdb.h>

#define SERVO_PORT 80 // standard HTTP port

#define MAXLINE 4096 // size of buffer to read data into
#define SA struct sockaddr

void err_n_die(const char *fmt, ...);

// ==============================================

int main(int argc, char **argv) {
  int sockfd, n;
  int sendbytes;
  struct sockaddr_in servaddr;
  char sendline[MAXLINE];
  char recvline[MAXLINE];

  if (argc != 2) {
    err_n_die("usage: %s <server address>", argv[0]);
  }

  if  (sockfd = socket(AF_INET, SOCK_STREAM, 0) < 0) {
    err_n_die("Error while creating socket");
  }

  
}

// ==============================================

void err_n_die(const char *fmt, ...) {
  int errno_save;
  va_list ap;

  // any system or library call can be set errno, so we need to save it now
  errno_save = errno;

  // print out the fmt+args to standard out
  va_start(ap, fmt);
  vfprintf(stdout, fmt, ap);
  fprintf(stdout, "\n");
  fflush(stdout);

  // print out error message if errno was set
  if (errno_save != 0) {
    fprintf(stdout, "(errno = %d) : %s\n", errno_save, strerror(errno_save));
    fprintf(stdout, "\n");
    fflush(stdout);
  }
  va_end(ap);

  // this is the end ..and_die part. Terminate with an error.
  exit(1);
}