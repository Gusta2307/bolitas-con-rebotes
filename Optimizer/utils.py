
# Get possible interval for loop problem
def get_interval(i,j,length):
    result = []
    if i < j:
        result += list(range(0,i)) + list(range(j + 1, length))
    else:
        result += list(range(j+1,i))
        
    if (i == 0 or j == 0) and length in result:
        result.remove(length)
    if (i == length or j == length) and 0 in result:
        result.remove(0)
        
    return result


def get_positions(len, i, j, k=None, m=None):
    result = {
        'i': i,
        'j': j,
        'k': k,
        'm': m
    }
    
    if j < i:
        result['j'] = j + len
        
    if k != None and  k < j:
        result['k'] = k + len
        
    if m != None and m > k:
        result['m'] = m + len
        
    return result

def check_init(i, j, end):
    return False if (i == 0 and j == end) or (i == end and j == 0) else True