// // add one to the value in the input ptr and write this to the content of the output ptr
// void addOne(int* input_ptr, int* output_ptr){
// 	*output_ptr = (*input_ptr) + 1;
// }

// now the pointers represent two array of length equal to len

extern "C" {
	void addOne(int* input_ptr, int* output_ptr, int len){
		int i;
		for(i = 0; i < len; i++)
			output_ptr[i] = input_ptr[i] - 50;
	}
}